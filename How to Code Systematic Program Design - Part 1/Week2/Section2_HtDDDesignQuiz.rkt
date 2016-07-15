;; HtDD Design Quiz

;; Age is Natural
;; interp. the age of a person in years
(define A0 18)
(define A1 25)

#;
(define (fn-for-age a)
  (... a))

;; Template rules used:
;; - atomic non-distinct: Natural


; Problem 1:
; 
; Consider the above data definition for the age of a person.
; 
; Design a function called teenager? that determines whether a person
; of a particular age is a teenager (i.e., between the ages of 13 and 19).


;; Age -> Boolean
;; produces true if teenager age between 13 and 19, else false
(check-expect (teenager? 10) false)
(check-expect (teenager? 16) true)

;(define (teenager? a) true) ; this is the stub

;(define (teenager? a)    ; this is the template
;  (... a))

(define (teenager? a)
  (and (>= a 13) (<= a 19)))


; Problem 2:
; 
; Design a data definition called MonthAge to represent a person's age
; in months.

;; MonthAge is Natural
;; interp. the age of a person in months
(define MA0 200)
(define MA1 100)

#;
(define (fn-for-month-age ma)
  (... ma))

;; Template rules used:
;; - atomic non-distinct: Natural



; Problem 3:
; 
; Design a function called months-old that takes a person's age in years 
; and yields that person's age in months.
; 


;; Age -> MonthAge
;; produces the age in months given the age in years
(check-expect (months-old 20) 240)

;(define (months-old a) 200) ; this is the stub

;(define (months-old a)    ; this is the template
;  (... a))

(define (months-old a)
  (* a 12))



; Problem 4:
; 
; Consider a video game where you need to represent the health of your
; character. The only thing that matters about their health is:
; 
;   - if they are dead (which is shockingly poor health)
;   - if they are alive then they can have 0 or more extra lives
; 
; Design a data definition called Health to represent the health of your
; character.
; 
; Design a function called increase-health that allows you to increase the
; lives of a character.  The function should only increase the lives
; of the character if the character is not dead, otherwise the character
; remains dead.


;; Health is one of:
;; - "dead"
;; - Natural
;; interp. the health of the player, "dead" or a natural bigger or equal to 0
(define H0 "dead")
(define H1 50)

#;
(define (fn-for-health h)
  (cond [(string=? "dead" h) (...)]
        [(natural? h) (... h)]))

;; Template rules used:
;; - atomic distinct "dead"
;; - atomic non-distinct: Natural



;; Health -> Health
;; produces increased health. If dead, produces dead
(check-expect (increase-health 20) 21)
(check-expect (increase-health "dead") "dead")

#;
(define (increase-health h)
  (cond [(and (string? h) (string=? "dead" h)) (...)]
        [(natural? h) (... h)]))

(define (increase-health h)
  (cond [(and (string? h) (string=? "dead" h)) "dead"]
        [(number? h) (+ 1 h)]))