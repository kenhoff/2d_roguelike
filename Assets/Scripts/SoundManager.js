#pragma strict

import System.Collections.Generic;


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

public function PlaySingle(clip : AudioClip) {
    fxSource.clip = clip;
    fxSource.Play();
}

function RandomizeFx(clips : List.<AudioClip>) {
    var randomIndex = Random.Range(0, clips.Count);
    var randomPitch : float = Random.Range(lowPitchRange, highPitchRange);

    fxSource.pitch = randomPitch;
    fxSource.clip = clips[randomIndex];
    fxSource.Play();
}
