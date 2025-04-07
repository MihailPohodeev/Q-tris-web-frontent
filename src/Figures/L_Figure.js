import { Figure } from "./Figure"


export class L_Figure extends Figure
{
	constructor(color)
	{
		super(color)

		this.rotationPositions = [
			[
				{ x : 1, y : 0  },
				{ x : 0, y : -1 },
				{ x : 0, y : -2 }
			],

			[
				{ x : 0, y : 1 },
				{ x : 1, y : 0 },
				{ x : 2, y : 0 }
			],

			[
				{ x : -1, y : 0 },
				{ x : 0, y : 1  },
				{ x : 0, y : 2  }
			],

			[
				{ x : 0, y : -1 },
				{ x : -1, y : 0 },
				{ x : -2, y : 0 }
			]
		];

		this.set_position(0, 0);
	}

	copy()
	{
		const result = new L_Figure(this.color);
		result.set_position(this.indexes.x, this.indexes.y);
		result.currentRotatePosition = this.currentRotatePosition;
		return result;
	}
}