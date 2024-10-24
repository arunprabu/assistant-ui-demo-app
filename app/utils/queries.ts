/* This example assumes that the database table schema has a messages column 
that stores the chat messages as a JSON string of type Array<CoreMessage>. 
You can modify the saveChat function to suit your database schema.*/

// For Restoring Chats: https://sdk.vercel.ai/examples/next/state-management/restore-messages
// For File Uploads: https://github.com/vercel/ai-chatbot/blob/main/app/(chat)/api/files/upload/route.ts

// export async function saveChat({
//   id,
//   messages,
//   userId,
// }: {
//   id: string;
//   messages: any;
//   userId: string;
// }) {
//   try {
//     const selectedChats = await db.select().from(chat).where(eq(chat.id, id));

//     if (selectedChats.length > 0) {
//       return await db
//         .update(chat)
//         .set({
//           messages: JSON.stringify(messages),
//         })
//         .where(eq(chat.id, id));
//     }

//     return await db.insert(chat).values({
//       id,
//       createdAt: new Date(),
//       messages: JSON.stringify(messages),
//       userId,
//     });
//   } catch (error) {
//     console.error("Failed to save chat in database");
//     throw error;
//   }
// }
