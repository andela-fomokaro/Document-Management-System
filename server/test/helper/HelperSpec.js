import faker from 'faker';

const SpecHelper = {
  adminRole: {
    id: 1,
    title: 'admin',
  },

  regularRole: {
    id: 2,
    title: 'regular',
  },

  authorRole: {
    id: 3,
    title: 'author',
  },

  contributorRole: {
    title: 'contributor',
    id: 4,
  },

  specUser1: {
    fullNames: 'Solomon faith',
    username: 'faith',
    email: 'faith.omokaro@andela.com',
    password: 'faith',
    roleId: 1,
  },

  specUser2: {
    fullNames: ' Solomon paul',
    username: 'paul',
    email: 'paul.solomon@gmail.com',
    password: 'paul',
    roleId: 2,
  },

  invalidUser: {
    fullNames: 'Invalid user',
    username: 'faker',
    Eemail: faker.internet.email(),
    password: faker.internet.password(),
  },

  invalidUser2: {
    Eemail: 'email@test.com',
    password: 'pass',
    username: 'test',
  },

  invalidUser3: {
    Email: 'ifiok@test.com',
  },

  specUser3: {
    fullNames: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 2,
    username: faker.internet.userName(),
  },

  specUser4: {
    fullNames: 'Oseni mercy',
    email: 'mercy.oseni@andela.com',
    password: 'mercy',
    roleId: 3,
    username: 'mercy',
  },

  specUser5: {
    fullNames: 'Omotola Mercy',
    email: 'omotola.mercy@test.com',
    password: 'omotola',
    roleId: 4,
    username: 'omotola',
  },

  specUser6: {
    fullNames: 'Adeshola Barbie',
    email: 'adeshola@test.com',
    password: 'adeshola',
    roleId: 3,
    username: 'adesola',
  },

  specUser7: {
    fullNames: 'Cindy Barbie',
    email: 'cindy@test.com',
    password: 'cindy',
    roleId: 3,
    username: 'cindy',
  },

  specUser8: {
    fullNames: 'Sophiat Ayomide',
    email: 'sophiat@test.com',
    password: 'sophiat',
    roleId: 3,
    username: 'sophait',
  },

  specUser9: {
    fullNames: 'Oyin Marie',
    email: 'oyin@test.com',
    password: 'oyin',
    roleId: 3,
    username: 'oyin',
  },

  specDocument1: {
    title: 'YOYOL',
    content: 'Andela is a place to be',
    access: 'public',
    ownerId: 1,
    id: 1,

  },

  specDocument2: {
    title: 'Computer Science',
    content: 'Computer science is the study of the theory, experimentation,and'
    + ' engineering that form the basis for the design and use of computers.'
    + ' It is the scientific and practical approach to computation and its applications'
    + 'and the systematic study of the feasibility, structure, expression, and'
    + ' mechanization of the methodical procedures (or algorithms) that'
    + ' underlie the acquisition, representation, processing, storage,'
    + ' communication of, and access to information.',
    access: 'role',
    ownerId: 2,
    id: 5,

  },

  specDocument3: {
    title: 'Text Editor',
    content: 'A text editor is a type of program used for editing plain text'
    + ' files. Such programs are sometimes known as "notepad" software,'
    + ' following the Microsoft Notepad. Text editors are provided with'
    + 'operating systems and software development packages, and can be used'
    + 'to change configuration files, documentation files and'
    + 'programming language source code.',
    access: 'role',
    ownerId: 3,

  },

  specDocument4: {
    title: faker.commerce.department(),
    content: faker.lorem.paragraph(),
    access: 'private',
    ownerId: 1,

  },

  specDocument5: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'public',
    ownerId: 5,
    id: 10,

  },

  invalidDocument: {
    newTitle: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    myAccess: 'private',
    ownerId: 3,

  },

  specDocument6: {
    title: 'My Love Note',
    content: 'Thank you for letting me “see” South Philly and for being a'
    + ' neighborhood where everyone seems to be my friend.'
    + ' A typical fall day: we took a walk down East Passyunk Ave and said'
    + ' hello to Jessie at Belle Cakery, visited with all the great folks...',
    access: 'public',
    ownerId: 1,

  },

  specDocument7: {
    title: 'Dear Diary',
    content: 'On her thirteenth birthday, Anne Frank’s parents give her a'
    + ' diary. She’s excited because she wants someone—or something—in which'
    + ' to confide all of her secret thoughts. Even though she has a rich'
    + ' social life, she feels misunderstood by everyone she knows.'
    + ' Anne starts writing about daily events, her thoughts,'
    + ' school grades, boys, all that.',
    access: 'private',
    ownerId: 2,

  },

  specDocument8: {
    title: faker.commerce.department(),
    content: faker.lorem.paragraph(),
    access: 'public',
    ownerId: 3,
  },

  specDocument9: {
    title: faker.commerce.department(),
    content: faker.lorem.paragraph(),
    access: 'role',
    ownerId: 3,
  },
};

export default SpecHelper;
