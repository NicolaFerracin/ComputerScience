
;; boolean-list-starter.rkt

;; =================
;; Data definitions:

; 
; PROBLEM A:
; 
; Design a data definition to represent a list of booleans. Call it ListOfBoolean. 
; 


;; Data Definition
;; ListOfBooleans is one of:
;; - empty
;; - (cons Boolean ListOfBooleans)
;; Each element in the list is either a Boolean or empty
(define LOB1 empty)
(define LOB2 (cons true (cons false empty)))


#;
(define (fn-for-lob lob)
  (cond [(empty? lob) (...)]                   ;BASE CASE
        [else (... (first lob)                 ;Boolean
                   (fn-for-lob (rest lob)))])) ;NATURAL RECURSION

;; template rules:
;; - one of 2 cases
;; - atomic distinct: empty
;; - compound: (cons Boolean ListOfBooleans)
;; - self-reference: (res tlob) is ListOfBooleans


;; =================
;; Functions:

; 
; PROBLEM B:
; 
; Design a function that consumes a list of boolean values and produces true 
; if every value in the list is true. If the list is empty, your function 
; should also produce true. Call it all-true?
; 

;; Function Definition
;; ListOfBooleans -> Boolean
;; produces true if all Booleans in the list are true or the list is empty
;(define (all-true? lon) false) ;stub

;; examples
;#
(check-expect (all-true? empty) true)
(check-expect (all-true?(cons true (cons true empty))) (and true true))
(check-expect (all-true?(cons true (cons false (cons true empty)))) (and true false true))

;#
(define (all-true? lob)
  (cond [(empty? lob) true]                   
        [else
         (and (first lob)
              (all-true? (rest lob)))]))