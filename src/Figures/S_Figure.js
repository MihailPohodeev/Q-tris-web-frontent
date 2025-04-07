import { Figure } from "./Figure"


export class S_Figure extends Figure
{
	constructor(color)
	{
		super(color)

		this.rotationPositions = [
			[
				{ x : 0, y : 1   },
				{ x : -1,  y : 1 },
				{ x : 1,  y : 0  }
			],

			[
				{ x : 0, y : -1 },
				{ x : 1, y : 0  },
				{ x : 1, y : 1  }
			]
		];

		this.set_position(0, 0);
	}

	copy()
	{
		const result = new S_Figure(this.color);
		result.set_position(this.indexes.x, this.indexes.y);
		result.currentRotatePosition = this.currentRotatePosition;
		return result;
	}
}