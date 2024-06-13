(require 2htdp/image)
(require 2htdp/universe)

;; countdown-animation starter.rkt

; 
; PROBLEM:
; 
; Design an animation of a simple countdown. 
; 
; Your program should display a simple countdown, that starts at ten, and
; decreases by one each clock tick until it reaches zero, and stays there.
; 
; To make your countdown progress at a reasonable speed, you can use the 
; rate option to on-tick. If you say, for example, 
; (on-tick advance-countdown 1) then big-bang will wait 1 second between 
; calls to advance-countdown.
; 
; Remember to follow the HtDW recipe! Be sure to do a proper domain 
; analysis before starting to work on the code file.
; 
; Once you are finished the simple version of the program, you can improve
; it by reseting the countdown to ten when you press the spacebar.
; 


;; A countdown that goes from 10 to 0 and reset when the spacebar is clicked

;; Constants
(define WIDTH 800)
(define HEIGHT 800)

(define START 10)

(define X (/ WIDTH 2))
(define Y (/ HEIGHT 2))

(define TXT_COLOR "indigo")
(define TXT_SIZE 50)

(define MTS (empty-scene WIDTH HEIGHT))

;; --------

;; Data definitions:

;; Countdown is Number
;; interp. numbers left to 0, starting from 10
(define C1 0)   ;end
(define C2 10)  ;start

#;
(define (fn-for-countdown c)
  (... c))

;; Template rules used:
;;  - atomic non-distinct: Number

;; --------

;; Functions:

;; Countdown -> Countdown
;; start the world with (main 10)
;; 
(define (main c)
  (big-bang c                                ; Countdown
            (on-tick   progress-countdown 1) ; Countdown -> Countdown
            (to-draw   render)               ; Countdown -> Countdown
            (on-key    handle-key)))  ; Countdown KeyEvent -> Countdown

;; Countdown -> Countdown
;; produce the next countdown, decreasing it by 1. If 0, leave it
(check-expect (progress-countdown 8) 7)
(check-expect (progress-countdown 0) 0)

;(define (progress-countdown c) 5) ;stub

;<use template from Countdown>

(define (progress-countdown c)
  (cond [(= 0 c) 0]
        [else (- c 1)]))


;; Countdown -> Image
;; render the Countdown at appropriate place on MTS 
(check-expect (render 4) (place-image (text "4" TXT_SIZE TXT_COLOR) X Y MTS))

;(define (render c) MTS) ;stub

;<use template from Countdown>

(define (render c)
  (place-image (text (number->string c) TXT_SIZE TXT_COLOR) X Y MTS))


;; Countdown KeyEvent -> Countdown
;; reset the countdown if key pressed is space
(check-expect (handle-key 10 " ") 10)
(check-expect (handle-key 8 " ") 10)
(check-expect (handle-key 8 "a") 8)

#;
(define (handle-key c ke)    ;stub
  0)

;<template from KeyEvent>


(define (handle-key c ke)
  (cond [(key=? ke " ") 10]
        [else c]))
                        
  

