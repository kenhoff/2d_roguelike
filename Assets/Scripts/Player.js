#pragma strict

class Player extends MovingObject {
    public var wallDamage : int = 1;
    public var pointsPerFood : int = 10;
    public var pointsPerSoda : int = 20;
    public var restartLevelDelay : float = 1;

    private var animator : Animator;
    private var food : int;

    function Start () {
        animator = GetComponent.<Animator>();
        food = GameManager.instance.playerFoodPoints;
        super();
    }

    function OnDisable() {
        GameManager.instance.playerFoodPoints = food;
    }

    function AttemptMove(xDir, yDir) {
        food --;


    }

    function CheckIfGameOver() {
        if (food <= 0) {
            GameManager.instance.GameOver();
        }
    }

}
