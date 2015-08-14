#pragma strict

public var moveTime : float = 0.1;
public var blockingLayer : LayerMask;

private var boxCollider: BoxCollider2D;
private var rb2D : Rigidbody2D;
private var inverseMoveTime : float;

function Start () {
    boxCollider = GetComponent.<BoxCollider2D>();
    rb2D = GetComponent.<Rigidbody2D>();
    inverseMoveTime = 1 / moveTime;
}

function Move(xDir : int, yDir : int, hit : RaycastHit2D) {
    var start = transform.position;
    var end = start + new Vector2(xDir, yDir);
    boxCollider.enabled = false;
    hit = Physics2D.Linecast (start, end, blockingLayer);
    boxCollider.enabled = true;
    if (hit.transform == null) {
        SmoothMovement(end);
        return true;
    }
    return false;
}

function SmoothMovement(end : Vector3) {
    var sqrRemainingDistance = (transform.position - end).sqrMagnitude;
    while (sqrRemainingDistance > Number.Epsilon) {
        var newPosition : Vector3 = Vector3.MoveTowards (rb2D.position, end, inverseMoveTime * Time.deltaTime);
        rb2D.MovePosition(newPosition);
        sqrRemainingDistance = (transform.position - end).sqrMagnitude;
        yield null;
    }
}


function AttemptMove(xDir : int, yDir : int) {
    // var hit : RaycastHit2D;
    // var canMove = Move (xDir, yDir,);

}


// c# crap

// //The virtual keyword means AttemptMove can be overridden by inheriting classes using the override keyword.
//        //AttemptMove takes a generic parameter T to specify the type of component we expect our unit to interact with if blocked (Player for Enemies, Wall for Player).
//        protected virtual void AttemptMove <T> (int xDir, int yDir)
//            where T : Component
//        {
//            //Hit will store whatever our linecast hits when Move is called.
//            RaycastHit2D hit;
//
//            //Set canMove to true if Move was successful, false if failed.
//            bool canMove = Move (xDir, yDir, out hit);
//
//            //Check if nothing was hit by linecast
//            if(hit.transform == null)
//                //If nothing was hit, return and don't execute further code.
//                return;
//
//            //Get a component reference to the component of type T attached to the object that was hit
//            T hitComponent = hit.transform.GetComponent <T> ();
//
//            //If canMove is false and hitComponent is not equal to null, meaning MovingObject is blocked and has hit something it can interact with.
//            if(!canMove && hitComponent != null)
//
//                //Call the OnCantMove function and pass it hitComponent as a parameter.
//                OnCantMove (hitComponent);
//        }
//
//
//        //The abstract modifier indicates that the thing being modified has a missing or incomplete implementation.
//        //OnCantMove will be overriden by functions in the inheriting classes.
//        protected abstract void OnCantMove <T> (T component)
//            where T : Component;
