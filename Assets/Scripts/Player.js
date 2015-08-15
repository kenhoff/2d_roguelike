﻿#pragma strict

class Player extends MovingObject {
    public var wallDamage : int = 1;
    public var pointsPerFood : int = 10;
    public var pointsPerSoda : int = 20;
    public var restartLevelDelay : float = 1;

    private var boxCollider: BoxCollider2D;
    private var animator : Animator;
    private var food : int;

    function Start () {
        boxCollider = GetComponent.<BoxCollider2D>();
        animator = GetComponent.<Animator>();
        food = GameManager.instance.playerFoodPoints;
        super();
    }

    function OnDisable() {
        GameManager.instance.playerFoodPoints = food;
    }

    function AttemptMove (xDir : int, yDir : int) {
        food--;

        var start = transform.position;
        var end = start + new Vector2(xDir, yDir);
        boxCollider.enabled = false;
        var hit = Physics2D.Linecast (start, end, blockingLayer);
        boxCollider.enabled = true;

        // if there's nothing in the way, move
        if (hit.transform == null) {
            super.SmoothMovement(end);
            // return true;
        }
        else {
        // if hit.transfrom != null, then figure out what you hit, and interact appropriately
        // return false;

            if (hit.transform.CompareTag("Wall")) {
                var hitWall = hit.transform.gameObject.GetComponent.<Wall>();
                Debug.Log(hitWall);
                hitWall.DamageWall(wallDamage);
                animator.SetTrigger("playerChop");
            }

        }

        CheckIfGameOver();

        GameManager.instance.playersTurn = false;
    }

    function CheckIfGameOver() {
        if (food <= 0) {
            GameManager.instance.GameOver();
        }
    }

    function Restart() {
        Application.LoadLevel(Application.loadedLevel);
    }

    public function LoseFood(loss : int) {
        animator.SetTrigger("playerHit");
        food -= loss;
        CheckIfGameOver();
    }

    function OnTriggerEnter2D(other: Collider2D) {
        if (other.CompareTag("Exit")) {
            Invoke("Restart", restartLevelDelay);
            enabled = false;
        }
        else if (other.CompareTag("Food")) {
            food += pointsPerFood;
            other.gameObject.SetActive(false);
        }
        else if (other.CompareTag("Food")) {
            food += pointsPerSoda;
            other.gameObject.SetActive(false);
        }
    }


    function Update() {
        if (!GameManager.instance.playersTurn) {
            return;
        }

        var horizontal : int;
        var vertical : int;

        horizontal = Input.GetAxisRaw("Horizontal");
        vertical = Input.GetAxisRaw("Vertical");

        if (horizontal != 0) {
            vertical = 0;
        }

        if (horizontal != 0 || vertical != 0) {
            AttemptMove(horizontal, vertical);
        }
    }

}
