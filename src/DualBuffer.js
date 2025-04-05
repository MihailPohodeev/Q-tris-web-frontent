import { Matrix } from "./Matrix"

export class DualBuffer
{
	constructor()
	{
		this.editBuffer = new Matrix();
		this.doneBuffer = new Matrix();
	}

	insert_element()
	{

	}

	insert_figure()
	{

	}

	get_matrix()
	{
		return this.doneBuffer.copy();
	}

	swap_buffers()
	{
		const tmp = this.editBuffer;
		this.editBuffer = this.doneBuffer;
		this.doneBuffer = tmp;
	}
}