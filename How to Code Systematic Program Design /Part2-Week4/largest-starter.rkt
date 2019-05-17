
;; largest-starter.rkt

;; =================
;; Data definitions:

; 
; Remember the data definition for a list of numbers we designed in Lecture 5f:
; (if this data definition does not look familiar, please review the lecture)
; 


;; ListOfNumber is one of:
;;  - empty
;;  - (cons Number ListOfNumber)
;; interp. a list of numbers
(define LON1 empty)
(define LON2 (cons 60 (cons 42 empty)))
#;
(define (fn-for-lon lon)
  (cond [(empty? lon) (...)]
        [else
         (... (first lon)
              (fn-for-lon (rest lon)))]))

;; Template rules used:
;;  - one of: 2 cases
;;  - atomic distinct: empty
;;  - compound: (cons Number ListOfNumber)
;;  - self-reference: (rest lon) is ListOfNumber

;; =================
;; Functions:

; 
; PROBLEM:
; 
; Design a function that consumes a list of numbers and produces the largest number 
; in the list. You may assume that all numbers in the list are greater than 0. If
; the list is empty, produce 0.
; 


;; ListOfNumber -> Number
;; produces the largest number in the list
;(define (max lon) 0) ;stub

;; examples
(check-expect (bigger empty) 0)
(check-expect (bigger(cons 40 (cons 30 empty))) 40)
(check-expect (bigger(cons 10 (cons 0 (cons 5 empty)))) 10)

(define (bigger lon)
  (cond [(empty? lon) 0]                   
        [else
         (cond [(> (first lon) (bigger (rest lon))) (first lon)]
            [else
             (bigger (rest lon))])]))
