/**
 * Paints Cogni's animated SVG onto a <canvas>, so the movement is smooth in Firefox.
 *
 * Why: Firefox shows a small, slow movement of SVG content (a few px over a second or more) in
 * visible steps, whatever the technique (CSS animation on the wrapper or on a group inside the
 * SVG, SMIL, or a script writing the transform every frame). A canvas does not have the problem,
 * because it is a bitmap redrawn from the vector at fractional positions every frame.
 *
 * How: the SVG stays in the page as the source of truth (server rendering, no-JavaScript,
 * reduced motion, and the CSS in src/styles/mascot.css that defines every movement). It is only
 * hidden once the canvas is showing. Each frame this module reads the SVG's current computed
 * styles (transform, opacity, colors) and draws the same shapes, so colors follow the theme and
 * there is no second copy of the timings or of the artwork.
 *
 * Only the shapes Cogni uses are drawn: circle, ellipse, rect, line, path, inside groups, with
 * a linear gradient fill.
 */

const TAU = Math.PI * 2;

interface Mirror {
	paint: () => void;
}

/** One shared requestAnimationFrame loop for every visible mascot on the page. */
const visible = new Set<Mirror>();
let frame = 0;

function tick() {
	frame = 0;
	for (const mirror of visible) mirror.paint();
	if (visible.size > 0) frame = requestAnimationFrame(tick);
}

function show(mirror: Mirror) {
	visible.add(mirror);
	if (!frame) frame = requestAnimationFrame(tick);
}

function hide(mirror: Mirror) {
	visible.delete(mirror);
	if (visible.size === 0 && frame) {
		cancelAnimationFrame(frame);
		frame = 0;
	}
}

/** "12px", "50%" or "12" to user units, for a reference box of the given size. */
function toUnits(value: string, size: number): number {
	const n = Number.parseFloat(value);
	if (Number.isNaN(n)) return 0;
	return value.trim().endsWith("%") ? (n / 100) * size : n;
}

/** Resolves `fill` / `stroke` to something a canvas understands (a color or a gradient). */
function paintStyle(
	ctx: CanvasRenderingContext2D,
	value: string,
	shape: SVGGraphicsElement,
): string | CanvasGradient | null {
	if (!value || value === "none") return null;
	if (!value.startsWith("url(")) return value;

	const id = /#([^")]+)/.exec(value)?.[1];
	const gradient = id ? shape.ownerSVGElement?.querySelector(`#${CSS.escape(id)}`) : null;
	if (!(gradient instanceof SVGLinearGradientElement)) return null;

	// objectBoundingBox units (the default): the gradient spans the shape's own box.
	const box = shape.getBBox();
	const at = (name: string, fallback: number) => {
		const raw = gradient.getAttribute(name);
		return raw === null ? fallback : Number.parseFloat(raw);
	};
	const result = ctx.createLinearGradient(
		box.x + at("x1", 0) * box.width,
		box.y + at("y1", 0) * box.height,
		box.x + at("x2", 1) * box.width,
		box.y + at("y2", 1) * box.height,
	);
	for (const stop of gradient.querySelectorAll("stop")) {
		result.addColorStop(
			Math.min(1, Math.max(0, Number.parseFloat(stop.getAttribute("offset") ?? "0"))),
			getComputedStyle(stop).stopColor,
		);
	}
	return result;
}

function shapePath(el: SVGElement): Path2D | null {
	const path = new Path2D();
	switch (el.tagName.toLowerCase()) {
		case "circle": {
			const c = el as SVGCircleElement;
			path.arc(c.cx.baseVal.value, c.cy.baseVal.value, c.r.baseVal.value, 0, TAU);
			return path;
		}
		case "ellipse": {
			const e = el as SVGEllipseElement;
			path.ellipse(
				e.cx.baseVal.value,
				e.cy.baseVal.value,
				e.rx.baseVal.value,
				e.ry.baseVal.value,
				0,
				0,
				TAU,
			);
			return path;
		}
		case "rect": {
			const r = el as SVGRectElement;
			path.rect(
				r.x.baseVal.value,
				r.y.baseVal.value,
				r.width.baseVal.value,
				r.height.baseVal.value,
			);
			return path;
		}
		case "line": {
			const l = el as SVGLineElement;
			path.moveTo(l.x1.baseVal.value, l.y1.baseVal.value);
			path.lineTo(l.x2.baseVal.value, l.y2.baseVal.value);
			return path;
		}
		case "path":
			return new Path2D(el.getAttribute("d") ?? "");
		default:
			return null;
	}
}

/** Applies the element's current CSS transform (animated or from its `transform` attribute). */
function applyTransform(
	ctx: CanvasRenderingContext2D,
	el: SVGGraphicsElement,
	style: CSSStyleDeclaration,
) {
	if (style.transform === "none" || style.transform === "") return;
	const m = new DOMMatrix(style.transform);
	// The computed matrix leaves out `transform-origin`, resolved against the element's
	// `transform-box`: its own geometry for `fill-box`, the viewBox otherwise.
	const [ox = "0", oy = "0"] = style.transformOrigin.split(" ");
	const box = style.transformBox === "fill-box" ? el.getBBox() : null;
	const x = (box?.x ?? 0) + toUnits(ox, box?.width ?? 160);
	const y = (box?.y ?? 0) + toUnits(oy, box?.height ?? 160);
	ctx.translate(x, y);
	ctx.transform(m.a, m.b, m.c, m.d, m.e, m.f);
	ctx.translate(-x, -y);
}

function paintNode(ctx: CanvasRenderingContext2D, el: Element, alpha: number) {
	if (!(el instanceof SVGGraphicsElement)) return;
	const style = getComputedStyle(el);
	const opacity = alpha * Number.parseFloat(style.opacity || "1");

	ctx.save();
	applyTransform(ctx, el, style);

	if (el instanceof SVGGElement) {
		for (const child of el.children) paintNode(ctx, child, opacity);
	} else {
		const path = shapePath(el);
		if (path) {
			const fill = paintStyle(ctx, style.fill, el);
			if (fill) {
				ctx.globalAlpha = opacity * Number.parseFloat(style.fillOpacity || "1");
				ctx.fillStyle = fill;
				ctx.fill(path);
			}
			const stroke = paintStyle(ctx, style.stroke, el);
			if (stroke) {
				ctx.globalAlpha = opacity * Number.parseFloat(style.strokeOpacity || "1");
				ctx.strokeStyle = stroke;
				ctx.lineWidth = Number.parseFloat(style.strokeWidth) || 1;
				ctx.lineCap = style.strokeLinecap as CanvasLineCap;
				ctx.lineJoin = style.strokeLinejoin as CanvasLineJoin;
				ctx.stroke(path);
			}
		}
	}
	ctx.restore();
}

/**
 * Starts mirroring the <svg> found in `root` onto a canvas appended to it. Sets the
 * `data-canvas` attribute on `root` once the first frame is drawn (the stylesheet then hides the SVG).
 * Returns a function that stops everything and restores the SVG.
 */
export function mountMascotCanvas(root: HTMLElement): () => void {
	const svg = root.querySelector("svg");
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	if (!svg || !ctx) return () => {};

	canvas.className = "mascot-canvas";
	canvas.setAttribute("aria-hidden", "true");
	root.appendChild(canvas);

	let width = 0;
	let ratio = 0;
	const sync = () => {
		const w = root.clientWidth;
		const r = window.devicePixelRatio || 1;
		if (w === width && r === ratio) return;
		width = w;
		ratio = r;
		canvas.width = Math.max(1, Math.round(w * r));
		canvas.height = canvas.width;
	};

	const mirror: Mirror = {
		paint() {
			sync();
			const scale = canvas.width / (svg.viewBox.baseVal.width || 160);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.setTransform(scale, 0, 0, scale, 0, 0);
			for (const child of svg.children) {
				if (child.tagName.toLowerCase() !== "defs") paintNode(ctx, child, 1);
			}
		},
	};

	mirror.paint();
	root.dataset.canvas = "";

	// Only draw while the mascot is on screen.
	const observer = new IntersectionObserver((entries) => {
		for (const entry of entries) (entry.isIntersecting ? show : hide)(mirror);
	});
	observer.observe(root);

	return () => {
		observer.disconnect();
		hide(mirror);
		delete root.dataset.canvas;
		canvas.remove();
	};
}
