// import { PrismaClient } from '@prisma/client'
// import { faker } from '@faker-js/faker'
// import bcrypt from 'bcryptjs'

// const prisma = new PrismaClient()

// async function main() {
//     const members = []

//     for (let i = 0; i < 30; i++) {
//         const randomProfession = faker.helpers.arrayElement(professionsAndSectors)
//         const hashedPassword = await bcrypt.hash('123456', 10)

//         members.push({
//             id: faker.string.uuid(),
//             name: faker.person.fullName(),
//             profession: randomProfession.profession,
//             permanentAddress: faker.location.streetAddress(),
//             currentAddress: faker.location.streetAddress(),
//             skills: faker.helpers.arrayElements(randomProfession.sectors, 3),
//             phone: faker.phone.number('+8801#########'),
//             email: faker.internet.email(),
//             facebookProfile: faker.internet.url(),
//             createdAt: faker.date.past(),
//             password: hashedPassword
//         })
//     }

//     await prisma.member.createMany({
//         data: members
//     })

//     console.log('✅ Seeded 30+ members with password!')
// }

// const professionsAndSectors = [
//     { profession: 'Lawyer', sectors: ['Legal Advice', 'Criminal Law', 'Corporate Law'] },
//     { profession: 'Doctor', sectors: ['General Health', 'Pediatrics', 'Cardiology'] },
//     { profession: 'Engineer', sectors: ['Civil Engineering', 'Mechanical Design', 'Electrical Systems'] },
//     { profession: 'Teacher', sectors: ['Mathematics', 'Science', 'Language Teaching'] },
//     { profession: 'Accountant', sectors: ['Tax Filing', 'Auditing', 'Budgeting'] },
//     { profession: 'Social Worker', sectors: ['Community Service', 'Mental Health Support'] },
//     { profession: 'Pharmacist', sectors: ['Prescription Advice', 'Health Consultation'] },
//     { profession: 'Architect', sectors: ['Building Design', 'Interior Design'] },
//     { profession: 'Nurse', sectors: ['Patient Care', 'Health Education'] }
// ]

// main()
//     .catch((e) => {
//         console.error(e)
//         process.exit(1)
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })
