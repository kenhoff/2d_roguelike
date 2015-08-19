#pragma strict

public var dmgSprite : Sprite;
public var hp : int = 4;

public var chopSounds : List.<AudioClip>;


private var spriteRenderer : SpriteRenderer;

function Awake () {
    spriteRenderer = GetComponent.<SpriteRenderer>();
}

function DamageWall(loss : int) {
    spriteRenderer.sprite = dmgSprite;
    SoundManager.instance.RandomizeFx(chopSounds);
    hp -= loss;
    if (hp <= 0) {
        gameObject.SetActive(false);
    }
}
