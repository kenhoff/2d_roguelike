#pragma strict

// var myList : List.<Type> = new List.<Type>();  // declaration
// var someNumbers = new List.<int>();            // a real-world example of declaring a List of 'ints'
// var enemies = new List.<GameObject>();         // a real-world example of declaring a List of 'GameObjects'
// var vtcs = new List.<Vector3>(mesh.vertices);  // convert an array to a list
// myList.Add(theItem);                           // add an item to the end of the List
// myList[i] = newItem;                           // change the value in the List at position i
// var thisItem = List[i];                        // retrieve the item at position i
// myList.RemoveAt(i);                            // remove the item from position i




import System.Collections.Generic;

public var turnDelay = 0.1;

public static var instance : GameManager = null;
public var boardScript : BoardManager;
public var playerFoodPoints : int = 100;
@HideInInspector public var playersTurn : boolean = true;

private var enemies : List.<Enemy>;
private var enemiesMoving : boolean;

private var level : int = 3;

function Awake() {
    if (instance == null) {
        instance = this;
    }
    else if (instance != this) {
        Destroy(gameObject);
    }
    DontDestroyOnLoad(gameObject);
    enemies = new List.<Enemy>();
    boardScript = GetComponent.<BoardManager>();
    InitGame();
}

function InitGame() {
    enemies.Clear();
    boardScript.SetupScene(level);
}

public function GameOver() {
    enabled = false;
}

function MoveEnemies() {
    enemiesMoving = true;
    yield WaitForSeconds(turnDelay);
    if (enemies.length == 0) {
        yield WaitForSeconds(turnDelay);
    }

    for (var i = 0; i < enemies.Count; i++) {
        enemies[i].GetComponent.<Enemy>().MoveEnemy();
        yield WaitForSeconds(enemies[i].GetComponent.<Enemy>().moveTime);
    }


}
