#pragma strict

class Enemy extends MovingObject {

    public var playerDamage : int;

    private var boxCollider: BoxCollider2D;
    private var animator : Animator;
    private var target : Transform;
    private var skipMove : boolean;

    public var attackSounds : List.<AudioClip>;


    function Start () {
        boxCollider = GetComponent.<BoxCollider2D>();
        animator = GetComponent.<Animator>();
        target = GameObject.FindGameObjectWithTag("Player").transform;
        GameManager.instance.AddEnemyToList(this);
        super();
    }

    function AttemptMove(xDir : int, yDir : int) {
        if (skipMove) {
            skipMove = false;
            return;
        }

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
            // if hit.transform != null, then figure out what you hit, and interact appropriately
            // return false;

            if (hit.transform.CompareTag("Player")) {
                var hitPlayer = hit.transform.gameObject.GetComponent.<Player>();
                hitPlayer.LoseFood(playerDamage);
                animator.SetTrigger("enemyAttack");
                SoundManager.instance.RandomizeFx(attackSounds);
            }
        }

        skipMove = true;
    }

    public function MoveEnemy() {
        var xDir : int = 0;
        var yDir : int = 0;

        if (Mathf.Abs(target.position.x - transform.position.x) < Number.Epsilon) {
            yDir = (target.position.y > transform.position.y) ? 1 : -1;
        }
        else {
            xDir = (target.position.x > transform.position.x) ? 1 : -1;
        }

        AttemptMove(xDir, yDir);

    }
}
