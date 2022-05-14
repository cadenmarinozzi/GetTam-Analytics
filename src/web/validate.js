function validatePlayer(player) {
	return !(
		player &&
		player.name &&
		player.id &&
		player.score &&
		player.score >= 0 &&
		player.score < 3932156 &&
		player.score % 1 === 0 &&
		!isNaN(player.score)
	);
}

export default validatePlayer;
