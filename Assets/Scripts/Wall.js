#pragma strict

public var dmgSprite : Sprite;
public var hp : int = 4;

private var spriteRenderer : SpriteRenderer;

function Awake () {
    spriteRenderer = GetComponent.<SpriteRenderer>();
}

function DamageWall(loss : int) {
    spriteRenderer.sprite = dmgSprite;
    hp -= loss;
    if (hp <= 0) {
        gameObject.SetActive(false);
    }
}
