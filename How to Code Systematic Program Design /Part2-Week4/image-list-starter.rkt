(require 2htdp/image)

;; image-list-starter.rkt

;; =================
;; Data definitions:

; 
; PROBLEM A:
; 
; Design a data definition to represent a list of images. Call it ListOfImage. 
; 


;; Data Definition
;; ListOfImage is one of:
;; - empty
;; - (cons Image ListOfImage)
(define LOI1 empty)
(define LOI2 (cons (square 20 "solid" "blue") (cons (circle 10 "solid" "red") empty)))


#;
(define (fn-for-loi loi)
  (cond [(empty? loi) (...)]                   ;BASE CASE
        [else (... (first loi)                 ;Image
                   (fn-for-loi (rest loi)))])) ;NATURAL RECURSION

;; template rules:
;; - one of 2 cases
;; - atomic distinct: empty
;; - compound: (cons Image ListOfImage)
;; - self-reference: (rest loi) is ListOfImage


;; =================
;; Functions:

; 
; PROBLEM B:
; 
; Design a function that consumes a list of images and produces a number 
; that is the sum of the areas of each image. For area, just use the image's 
; width times its height.
; 


;; Function Definition
;; ListOfNumber -> Number
;; produces the sum weight of all the owls in the list
;(define (totalWeight lon) 0) ;stub

;; examples
(check-expect (area LOI1) 0)
(check-expect (area LOI2) (+ (* 20 20) (* 20 20)))
(check-expect (area (cons (square 20 "solid" "blue")
                    (cons (circle 10 "solid" "red")
                    (cons (triangle 30 "solid" "green") empty))))
                    (+ (* 20 20) (* 20 20) (* 30 26)))


(define (area loi)
  (cond [(empty? loi) 0]                   
        [else
         (+
          (*(image-width (first loi)) (image-height (first loi)))
          (area (rest loi)))]))



