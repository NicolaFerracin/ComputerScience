
;; designing-with-lists-1-starter.rkt

; 
; PROBLEM:
; 
; You've been asked to design a program having to do with all the owls
; in the owlery.
; 
; (A) Design a data definition to represent the weights of all the owls. 
;     For this problem call it ListOfNumber.
; (B) Design a function that consumes the weights of owls and produces
;     the total weight of all the owls.
; (C) Design a function that consumes the weights of owls and produces
;     the total number of owls.
;     


;; Data Definition
;; ListOfNumber is one of:
;; - empty
;; - (cons Number ListOfNumber)
;; interpr. each number in the list is the weight of an owl
(define LON1 empty)
(define LON2 (cons 20 (cons 30 empty)))


#;
(define (fn-for-lon lon)
  (cond [(empty? lon) (...)]                   ;BASE CASE
        [else (... (first lon)                 ;Number
                   (fn-for-lon (rest lon)))])) ;NATURAL RECURSION

;; template rules:
;; - one of 2 cases
;; - atomic distinct: empty
;; - compound: (cons Number ListOfNumber)
;; - self-reference: (rest lon) is ListOfNumber


;; Function Definition
;; ListOfNumber -> Number
;; produces the sum weight of all the owls in the list
;(define (totalWeight lon) 0) ;stub

;; examples
(check-expect (totalWeight empty) 0)
(check-expect (totalWeight(cons 40 (cons 30 empty))) (+ 40 30))
(check-expect (totalWeight(cons 10 (cons 0 (cons 5 empty)))) (+ 10 0 5))

(define (totalWeight lon)
  (cond [(empty? lon) 0]                   
        [else
         (+ (first lon) (totalWeight (rest lon)))]))


;; Function Definition
;; ListOfNumber -> Natural
;; produces the sum of owls in the list
; (define (totalOwls lon) 0) ;stub

;; examples
(check-expect (totalOwls empty) 0)
(check-expect (totalOwls(cons 40 (cons 30 empty))) (+ 1 1))
(check-expect (totalOwls(cons 10 (cons 0 (cons 5 empty)))) (+ 1 1 1))

(define (totalOwls lon)
  (cond [(empty? lon) 0]                   
        [else
         (+ 1 (totalOwls (rest lon)))]))

