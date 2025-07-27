async function initializeKubeClient() {
    const k8s = await import('@kubernetes/client-node');
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();

    const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

    return k8sApi;
};

async function printNameSpacedPods(k8sApi) {
    await k8sApi.listNamespacedPod({namespace: 'default'}).then((res)=>{
        const pods = res.items;
        pods.forEach((pod)=>{
            console.log("Pod: "+ pod.metadata.name);
        });
    });
}

async function createNameSpace(k8sApi, namespace) {

    await k8sApi.createNamespace({ body: namespace }).then(
    (response) => {
        console.log('Created namespace');
        console.log(response);
        k8sApi.readNamespace(namespace.metadata.name).then((response) => {
            console.log(response);
            k8sApi.deleteNamespace(namespace.metadata.name, {} );
        });
    },
    (err) => {
        console.log('Error!: ' + err);
    },
);
}


const main = () => {
    initializeKubeClient().then(async (k8sApi)=>{
        console.log("Namesspace before creation: ");
        await printNameSpacedPods(k8sApi);
        var namespace = {
            metadata: {
                name: 'test',
            },
        };
        await createNameSpace(k8sApi, namespace);
        console.log("Namesspace after creation: ");
        await printNameSpacedPods(k8sApi);
    });
};

main();



