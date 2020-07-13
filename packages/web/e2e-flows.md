# E2E Flows

- Add/Remove new note
  - only a note
    - type text + {enter}
    * expect table to contain text
  - note + words
- Go between resources
  - expect resource (1 / 2)
  * press right
  - expect resource (2 / 2)
- Go between paragraphs
  - expect page.contains('1 / 7')
  * click down
  - expect page.contains('2/7')
  * click x6
  - expect page.contains('1/7)
- Read note
  - click first note > approve x1 reject x1 (click)
    - expect page.contains('no metatada')
    * go to / ('notes') - item should be watched:true
    * go to (click) /resources
      - expect approved_lists .should.contains(1)
      - expect rejected_list .should.contains(1)
      * click approved
        - click reject on item
          - expect page.contains('list is empty')
          - expect approved list (0)
          - expect rejected list (2)
      * click rejected
        - click approve
          - expect approved_list.contains(1)
          - expect reject list (1)
        - click unread
          - expect approved_list.contains(0)
          - expect rejected.contains('1')
          - expect page.contains('list is empty')
        - click notes
          - click first note
          * expect page.contains('resource (1 / 1)')
