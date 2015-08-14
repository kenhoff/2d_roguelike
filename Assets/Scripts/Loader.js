#pragma strict

public var gameManager : GameObject;

function Awake () {
    if (GameManager.instance == null) {
        Instantiate(gameManager);
    }
}
