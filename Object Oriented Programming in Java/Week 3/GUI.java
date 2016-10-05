package module2;

import processing.core.*;

public class GUI extends PApplet {
	
	private String bgUrl = "http://eskipaper.com/images/awesome-3d-backgrounds-2.jpg"; 
	private PImage backgroundImg;
	
	// configure canvas
	public void setup() {
		size(500, 500);
		backgroundImg = loadImage(bgUrl, "jpg");
	}
	
	// draw canvas
	public void draw() {
		backgroundImg.resize(0, height);
		image(backgroundImg, 0, 0);
		int[] fillRgb = getRgb(second());
		fill(fillRgb[0], fillRgb[1], fillRgb[2]);
		ellipse(width/4, height/5, width/5, height/5);
	}
	
	private int[] getRgb(float second) {
		int[] rgb = new int[3];
		float ratio = (second % 30) / 30;
		rgb[0] = (int)(ratio * 255);
		rgb[1] = (int)(ratio * 255);
		rgb[2] = 0;
		return rgb;
	}
}
