#pragma strict

public static var instance : GameManager = null;
public var boardScript : BoardManager;
public var playerFoodPoints : int = 100;
@HideInInspector public var playersTurn : boolean = true;

private var level : int = 3;

function Awake() {
    if (instance == null) {
        instance = this;
    }
    else if (instance != this) {
        Destroy(gameObject);
    }
    DontDestroyOnLoad(gameObject);
    boardScript = GetComponent.<BoardManager>();
    InitGame();
}

function InitGame() {
    boardScript.SetupScene(level);
}

public function GameOver() {
        enabled = false;
}
