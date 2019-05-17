(require 2htdp/image)
(require 2htdp/universe)

;; traffic-light-starter.rkt

; 
; PROBLEM:
; 
; Design an animation of a traffic light. 
; 
; Your program should show a traffic light that is red, then green, 
; then yellow, then red etc. For this program, your changing world 
; state data definition should be an enumeration.
; 
; Here is what your program might look like if the initial world 
; state was the red traffic light:
; .
; Next:
; .
; Next:
; .
; Next is red, and so on.
; 
; To make your lights change at a reasonable speed, you can use the 
; rate option to on-tick. If you say, for example, (on-tick next-color 1) 
; then big-bang will wait 1 second between calls to next-color.
; 
; Remember to follow the HtDW recipe! Be sure to do a proper domain 
; analysis before starting to work on the code file.
; 
; Note: If you want to design a slightly simpler version of the program,
; you can modify it to display a single circle that changes color, rather
; than three stacked circles. 
; 



;; stacked traffic lights changing color. Red -> green -> yellow -> from the beginning

;; Constants
(define MTS_WIDTH 800)
(define MTS_HEIGHT 800)

(define MARGIN 20)
(define SINGLE_LIGHT_SIZE 50)
(define LIGHTS_AMOUNT 3)
(define SCENE_HEIGHT (+ (* SINGLE_LIGHT_SIZE LIGHTS_AMOUNT 2) MARGIN))
(define SCENE_WIDTH (+ (* SINGLE_LIGHT_SIZE 2) MARGIN))

(define BG_X (/ MTS_WIDTH 2))
(define BG_Y (/ MTS_HEIGHT 2))

(define MTS (empty-scene MTS_WIDTH MTS_HEIGHT))

;; --------

;; Data definitions:

;; Light is Integer[0, 2]
;; interp. the number of the traffic light active state. 0 = red, 1 = green, 2 = yellow
(define L1 0)  ; red
(define L2 1)   ; green
(define L3 2)   ; yellow

#;
(define (fn-for-light l)
  (... l))

;; Template rules used:
;;  - atomic non-distinct: Integer[0, 2]

;; --------

;; Functions:

;; Light -> Light
;; start the world with (main 0)
;; 
(define (main c)
  (big-bang c                                ; Light
            (on-tick   next-light 1)         ; Light -> Light
            (to-draw   render)))             ; Light -> Light

;; Light -> Light
;; produce the next Light, if 0 -> 1, if 1 -> 2, if 2 -> 0
(check-expect (next-light 0) 1)
(check-expect (next-light 1) 2)
(check-expect (next-light 2) 0)

;(define (next-light c) 1) ;stub

;<use template from Light>

(define (next-light c)
  (cond [(= c 0) 1]
        [(= c 1) 2]
        [else 0]))


;; Light -> Image
;; render the full traffic light Light at appropriate place on MTS
(check-expect (render 0) (place-image
                          (overlay
                           (above (circle SINGLE_LIGHT_SIZE "solid" "red")
                            (circle SINGLE_LIGHT_SIZE "outline" "yellow")
                            (circle SINGLE_LIGHT_SIZE "outline" "green"))
                           (rectangle SCENE_WIDTH SCENE_HEIGHT "solid" "black"))
                          BG_X BG_Y MTS))

(check-expect (render 1) (place-image
                          (overlay
                           (above (circle SINGLE_LIGHT_SIZE "outline" "red")
                            (circle SINGLE_LIGHT_SIZE "outline" "yellow")
                            (circle SINGLE_LIGHT_SIZE "solid" "green"))
                           (rectangle SCENE_WIDTH SCENE_HEIGHT "solid" "black"))
                          BG_X BG_Y MTS))

(check-expect (render 2) (place-image
                          (overlay
                           (above (circle SINGLE_LIGHT_SIZE "outline" "red")
                            (circle SINGLE_LIGHT_SIZE "solid" "yellow")
                            (circle SINGLE_LIGHT_SIZE "outline" "green"))
                           (rectangle SCENE_WIDTH SCENE_HEIGHT "solid" "black"))
                          BG_X BG_Y MTS))

;(define (render c) MTS) ;stub

;<use template from Light>

(define (render c)
  (place-image (overlay
                (above (circle SINGLE_LIGHT_SIZE (if (= c 0) "solid"
                                                     "outline") "red")
                       (circle SINGLE_LIGHT_SIZE (if (= c 2) "solid"
                                                     "outline") "yellow")
                       (circle SINGLE_LIGHT_SIZE (if (= c 1) "solid"
                                                     "outline") "green"))
                (rectangle SCENE_WIDTH SCENE_HEIGHT "solid" "black"))
                BG_X BG_Y MTS))

