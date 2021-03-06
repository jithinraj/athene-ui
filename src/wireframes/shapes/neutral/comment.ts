import { DiagramShape } from '@app/wireframes/model';

import { AbstractContext, AbstractControl } from '@app/wireframes/shapes/utils/abstract-control';
import { CommonTheme } from './_theme';

const DEFAULT_APPEARANCE = {};
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_TEXT] = 'Lorem ipsum dolor sit amet, alii rebum postea eam ex. Et mei laoreet officiis, summo sensibus id mei.';
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_TEXT_ALIGNMENT] = 'left';
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_FONT_SIZE] = CommonTheme.CONTROL_FONT_SIZE;
DEFAULT_APPEARANCE[DiagramShape.APPEARANCE_STROKE_THICKNESS] = 1;

export class Comment extends AbstractControl {
    public identifier(): string {
        return 'Comment';
    }

    public createDefaultShape(shapeId: string): DiagramShape {
        return DiagramShape.createShape(shapeId, this.identifier(), 170, 150, undefined, DEFAULT_APPEARANCE);
    }

    protected renderInternal(ctx: AbstractContext) {
        const corner = Math.min(14, ctx.bounds.width, ctx.bounds.height) - .5;

        this.createBorder(ctx, corner);
        this.createText(ctx);
    }

    private createBorder(ctx: AbstractContext, c: number) {
        const l = ctx.bounds.left;
        const r = ctx.bounds.right;
        const t = ctx.bounds.top;
        const b = ctx.bounds.bottom;

        const borderItem = ctx.renderer.createBoundedPath(ctx.bounds, `M${l + c},${t} L${r},${t} L${r},${b} L${l},${b} L${l},${t + c} L${l + c},${t} L${l + c},${t + c} L${l},${t + c} z`, ctx.shape);

        ctx.renderer.setBackgroundColor(borderItem, 0xfff9b7);
        ctx.renderer.setStrokeColor(borderItem, 0);
        ctx.renderer.setStrokeStyle(borderItem, 'round', 'round');

        ctx.add(borderItem);
    }

    private createText(ctx: AbstractContext) {
        const textItem = ctx.renderer.createMultilineText(ctx.bounds.deflate(20, 20), ctx.shape);

        ctx.add(textItem);
    }
}