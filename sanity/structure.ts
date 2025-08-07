import { StructureBuilder } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Admin Dashboard')
    .items([
      // Course Content
      S.listItem()
        .title('Course Content')
        .child(
          S.documentTypeList('course')
            .title('Courses')
            .child((courseId) =>
              S.list()
                .title('Course Options')
                .items([
                  // Option to edit course content
                  S.listItem()
                    .title('Edit Course Content')
                    .child(S.document().schemaType('course').documentId(courseId)),
                  // Option to view course enrollments
                  S.listItem()
                    .title('View Students')
                    .child(
                      S.documentList()
                        .title('Course Enrollments')
                        .filter('_type == "enrollment" && course._ref == $courseId')
                        .params({ courseId })
                    ),
                ])
            )
        ),

      S.divider(),

      // Users
      S.listItem()
        .title('User Management')
        .child(
          S.list()
            .title('Select a Type of User')
            .items([
              // Authors with options
              S.listItem()
                .title('Authors')
                .schemaType('author')
                .child(
                  S.documentTypeList('author')
                    .title('Authors')
                    .child((authorId) =>
                      S.list()
                        .title('Author Options')
                        .items([
                          // Option to edit author details
                          S.listItem()
                            .title('Edit Author Details')
                            .child(S.document().schemaType('author').documentId(authorId)),
                          // Option to view author's courses
                          S.listItem()
                            .title('View Courses')
                            .child(
                              S.documentList()
                                .title("Author's Courses")
                                .filter('_type == "course" && author._ref == $authorId')
                                .params({ authorId })
                            ),
                        ])
                    )
                ),
              // Students with options
              S.listItem()
                .title('Students')
                .schemaType('student')
                .child(
                  S.documentTypeList('student')
                    .title('Students')
                    .child((studentId) =>
                      S.list()
                        .title('Student Options')
                        .items([
                          // Option to edit student details
                          S.listItem()
                            .title('Edit Student Details')
                            .child(S.document().schemaType('student').documentId(studentId)),
                          // Option to view enrollments
                          S.listItem()
                            .title('View Enrollments')
                            .child(
                              S.documentList()
                                .title('Student Enrollments')
                                .filter('_type == "enrollment" && student._ref == $studentId')
                                .params({ studentId })
                            ),
                          // Option to view completed lessons
                          S.listItem()
                            .title('View Completed Lessons')
                            .child(
                              S.documentList()
                                .title('Completed Lessons')
                                .schemaType('lessonCompletion')
                                .filter('_type == "lessonCompletion" && student._ref == $studentId')
                                .params({ studentId })
                                .defaultOrdering([{ field: 'completedAt', direction: 'desc' }])
                            ),
                        ])
                    )
                ),
            ])
        ),

      S.divider(),

      // System Management
      S.listItem()
        .title('System Management')
        .child(
          S.list()
            .title('System Management')
            .items([S.documentTypeListItem('category').title('Categories')])
        ),
    ]);
