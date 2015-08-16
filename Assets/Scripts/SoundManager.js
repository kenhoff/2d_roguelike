#pragma strict

public var fxSource : AudioSource;
public var musicSource : AudioSource;

public static var instance : SoundManager = null;

public var lowPitchRange : float = 0.95;
public var highPitchRange : float = 1.05;


function Awake () {

	if (instance == null) {
		instance = this;
	}
	else if (instance != this) {
		Destroy(gameObject);
	}
	DontDestroyOnLoad(gameObject);
}

public function PlaySingle(clip AudioClip) {
    // body...
}



function Update () {

}
