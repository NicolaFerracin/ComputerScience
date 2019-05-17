
;; student-starter.rkt

;; =================
;; Data definitions:

; 
; PROBLEM A:
; 
; Design a data definition to help a teacher organize their next field trip. 
; On the trip, lunch must be provided for all students. For each student, track 
; their name, their grade (from 1 to 12), and whether or not they have allergies.
; 



(define-struct student (name grade allergy))
;; student is (make-student String Number Boolean)
;; interp. a student with name, grade (1 to 12) and allergy status

(define S1 (make-student "Gian" 10 false))
(define S2 (make-student "Pino" 1 true))

#;
(define (fn-for-student s)
  (... (student-name s)        ;String
       (student-grade s)       ;Number
       (student-allergy s)))   ;Boolean

;; Template rules used:
;;  - compound: 3 fields


;; =================
;; Functions:

; 
; PROBLEM B:
; 
; To plan for the field trip, if students are in grade 6 or below, the teacher 
; is responsible for keeping track of their allergies. If a student has allergies, 
; and is in a qualifying grade, their name should be added to a special list. 
; Design a function to produce true if a student name should be added to this list.
; 



;; Student -> Boolean
;; produces true if grade <= 6 and allergy is true
(check-expect (add-to-list? S1) false)
(check-expect (add-to-list? S2) true)

;(define (add-to-list? s1) true) ; this is the stub

#;
(define (fn-for-student s)
  (... (student-name s)        ;String
       (student-grade s)       ;Number
       (student-allergy s)))   ;Boolean


(define (add-to-list? s)
  (and (<= (student-grade s) 6) (student-allergy s)))

