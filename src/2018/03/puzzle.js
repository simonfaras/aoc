const parseClaim = claim => {
	const [id, offset, size] = claim.replace(/[#:]| @/g, '').split(' ');
	const [left, top] = offset.split(',').map(Number);
	const [width, height] = size.split('x').map(Number);

	return {
		id: Number(id),
		left,
		top,
		width,
		height
	};
};

function calcOverlaps(claims) {
	return claims
		.map(parseClaim)
		.reduce((squares, { id, left, top, width, height }) => {
			const maxRow = top + height;
			const maxColumn = left + width;
			for (let row = top + 1; row <= maxRow; row++) {
				for (let column = left + 1; column <= maxColumn; column++) {
					const idClaims = squares[`${row}/${column}`] || [];
					squares[`${row}/${column}`] = [...idClaims, id];
				}
			}
			return squares;
		}, {});
}

function first(input) {
	const claimedSquareInches = calcOverlaps(input);

	return Object.values(claimedSquareInches).reduce(
		(overlaps, ids) => (ids.length > 1 ? overlaps + 1 : overlaps),
		0
	);
}

function doesIntersect(first, second) {
	if (
		first.bottomRight.x < second.topLeft.x ||
		second.bottomRight.x < first.topLeft.x
	) {
		return false;
	}

	if (
		first.bottomRight.y < second.topLeft.y ||
		second.bottomRight.y < first.topLeft.y
	) {
		return false;
	}
	return true;
}

function createBounds(claim) {
	return {
		topLeft: {
			x: claim.left + 1,
			y: claim.top + 1
		},
		bottomRight: {
			x: claim.left + claim.width,
			y: claim.top + claim.height
		}
	};
}

function second(input) {
	const bounds = input
		.map(parseClaim)
		.map(claim => ({
			...createBounds(claim),
			id: claim.id
		}));
	let current;
	let intersects = false;
	for(let i = 0; i < bounds.length; i++) {
		current = bounds[i]
		intersects = false;
		for (let l = 0; l < bounds.length; l++) {
			if (i !== l && doesIntersect(current, bounds[l])) {
				intersects = true;
				break;
			}
		}
		if (!intersects) {
			break;
		}
	}
	return !intersects ? current.id : "NOTHING";
}

module.exports = {
	first,
	second
};
