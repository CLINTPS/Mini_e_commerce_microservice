// import { Server, ServerCredentials } from '@grpc/grpc-js';
// import * as protoLoader from '@grpc/proto-loader';
// import path from 'path';
// import { ProtoGrpcType } from './proto/user.proto';
// import { User } from './proto/user/User';
// import { Empty } from './proto/google/protobuf/empty';

// const PROTO_PATH = path.join(__dirname, 'proto/user.proto');
// const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
//   keepCase: true,
//   longs: String,
//   enums: String,
//   defaults: true,
//   oneofs: true,
// });

// const userProto = (grpc.loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType;

// const server = new Server();

// const users: User[] = [];

// server.addService(userProto.user.UserService.service, {
//   CreateUser: (call, callback) => {
//     const user = call.request;
//     users.push(user);
//     console.log('User created:', user);
//     callback(null, new Empty());
//   },
// });

// const PORT = '50051';
// server.bindAsync(`localhost:${PORT}`, ServerCredentials.createInsecure(), () => {
//   console.log(`gRPC server running on port ${PORT}`);
//   server.start();
// });
