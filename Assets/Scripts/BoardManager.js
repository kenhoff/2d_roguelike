#pragma strict
#pragma downcast


class Count extends System.Object {
    public var minimum : int;
    public var maximum : int;
    function Count (min : int, max : int) {
        minimum = min;
        maximum = max;
    }
}
// var count = Count();

public var columns : int = 8;
public var rows : int = 8;
public var wallCount : Count = Count(5, 9);
public var foodCount : Count = Count(1, 5);
public var exit : GameObject;
public var floorTiles : GameObject[];
public var foodTiles : GameObject[];
public var wallTiles : GameObject[];
public var outerWallTiles : GameObject[];
public var enemyTiles : GameObject[];

private var boardHolder : Transform;
private var gridPositions : Array = new Array();


function InitializeList() {
    gridPositions.Clear();

    for (var x = 1; x < columns - 1; x++) {
        for (var y = 1; y < rows - 1; y++) {
            gridPositions.Add(new Vector3(x, y, 0));
        }
    }
}

function BoardSetup() {
    boardHolder = new GameObject("Board").transform;
    for (var x = -1; x < columns + 1; x++) {
        for (var y = -1; y < rows + 1; y++) {
            // gridPositions.Add(new Vector3(x, y, 0));
            var toInstantiate : GameObject;
            toInstantiate = floorTiles[Random.Range(0, floorTiles.length)];
            if (x == -1 || x == columns || y == -1 || y == rows) {
                toInstantiate = outerWallTiles[Random.Range(0, outerWallTiles.length)];
            }
            var instance : GameObject = Instantiate(toInstantiate, new Vector3(x, y, 0), Quaternion.identity);
            instance.transform.SetParent(boardHolder);
        }

    }
}


function RandomPosition() {
    var randomIndex : int = Random.Range(0, gridPositions.Count);
    var randomPosition = gridPositions[randomIndex]; // always going to be a Vector3
    gridPositions.RemoveAt(randomIndex);
    return randomPosition;

}

function LayoutObjectAtRandom(tileArray : GameObject[], minimum : int, maximum : int) {
    var objectCount = Random.Range(minimum, maximum + 1);
    for (var i = 0; i < objectCount; i++) {
        var randomPosition = RandomPosition();
        var tileChoice = tileArray[Random.Range(0, tileArray.length)];
        Instantiate(tileChoice, randomPosition, Quaternion.identity);
        //
    }
}

public function SetupScene (level : int) {
    BoardSetup();
    InitializeList();
    LayoutObjectAtRandom(wallTiles, wallCount.minimum, wallCount.maximum);
    LayoutObjectAtRandom(foodTiles, foodCount.minimum, foodCount.maximum);
    var enemyCount : int = Mathf.Log(level, 2.0);
    LayoutObjectAtRandom(enemyTiles, enemyCount, enemyCount);
    Instantiate(exit, new Vector3(columns - 1, rows - 1, 0), Quaternion.identity);
}
