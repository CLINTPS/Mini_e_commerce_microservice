// import { credentials } from '@grpc/grpc-js';
// import * as protoLoader from '@grpc/proto-loader';
// import path from 'path';
// import { ProtoGrpcType } from './proto/user';
// import { User } from './proto/user/User';

// const PROTO_PATH = path.join(__dirname, 'proto/user.proto');
// const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
//   keepCase: true,
//   longs: String,
//   enums: String,
//   defaults: true,
//   oneofs: true,
// });

// const userProto = (grpc.loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType;

// const client = new userProto.user.UserService('localhost:50051', credentials.createInsecure());

// export const userCreatedProducer = async (data: User) => {
//   console.log("AddUser second location");

//   try {
//     if (data.role === "user" || data.role === "admin") {
//       client.CreateUser(data, (error, response) => {
//         if (error) {
//           console.error("gRPC auth produce error:", error.message);
//         } else {
//           console.log("User created:", response);
//         }
//       });
//     } else {
//       throw new Error("Role is undefined");
//     }
//   } catch (error: any) {
//     console.error("gRPC auth produce error:", error?.message);
//   }
// };
