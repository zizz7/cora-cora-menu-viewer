const TOKEN = "a6ada131-5377-4c74-8356-8e5d1195cec1";
const API = "https://backboard.railway.app/graphql/v2";
const SERVICE_ID = "8052e8ce-e1e0-4f1d-8ea8-e48c499d6eb4";
const ENV_ID = "d452855e-e8fc-401f-a429-301358f94ebe";
const PROJECT_ID = "b9143797-3a28-45a3-bd26-f97408baf04c";

async function gql(query, variables = {}) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) {
    console.error("Errors:", JSON.stringify(json.errors, null, 2));
    throw new Error(json.errors[0].message);
  }
  return json.data;
}

async function main() {
  // Step 1: Connect the GitHub repo to the service
  console.log("1. Connecting GitHub repo to Railway service...");
  await gql(
    `mutation($input: ServiceConnectInput!) {
      serviceConnect(input: $input, id: "${SERVICE_ID}") { id name }
    }`,
    {
      input: {
        repo: "zizz7/cora-cora-menu-viewer",
        branch: "master"
      }
    }
  );
  console.log("   Connected!");

  // Step 2: Trigger deployment
  console.log("2. Triggering deployment...");
  const deployResult = await gql(`
    mutation {
      serviceInstanceDeploy(
        serviceId: "${SERVICE_ID}"
        environmentId: "${ENV_ID}"
      )
    }
  `);
  console.log("   Deploy triggered:", deployResult.serviceInstanceDeploy);

  // Step 3: Wait and check deployment status
  console.log("3. Checking deployment status...");
  await new Promise(r => setTimeout(r, 5000));
  
  const deployments = await gql(`{
    deployments(first: 1, input: { projectId: "${PROJECT_ID}", environmentId: "${ENV_ID}", serviceId: "${SERVICE_ID}" }) {
      edges {
        node {
          id
          status
          createdAt
        }
      }
    }
  }`);
  
  if (deployments.deployments.edges.length > 0) {
    const dep = deployments.deployments.edges[0].node;
    console.log(`   Deployment ${dep.id}: ${dep.status}`);
  }

  console.log("\n=== Deployment in progress! ===");
  console.log("URL: https://menu-viewer-production.up.railway.app");
  console.log("The build will take a few minutes. Check Railway dashboard for progress.");
}

main().catch(e => console.error("Failed:", e.message));
