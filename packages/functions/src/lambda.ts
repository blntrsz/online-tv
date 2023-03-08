import { ApiHandler } from "sst/node/api";
import { CreateAWSLambdaContextOptions, awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import { appRouter} from './trpc'
import trcp from '@trpc/server'
import { APIGatewayProxyEventV2 } from "aws-lambda";

// created for each request
const createContext = ({
  event,
  context,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => ({}) // no context

type Context = trcp.inferAsyncReturnType<typeof createContext>;

export const handler = ApiHandler(awsLambdaRequestHandler({
  router: appRouter,
  createContext,
  batching: {
    enabled: true
  }
}))
