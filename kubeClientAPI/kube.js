async function initializeKubeClient() {
    const k8s = await import('@kubernetes/client-node');
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();

    const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

    k8sApi.listNamespacedPod({ namespace: 'default' }).then((res) => {
    console.log(res);
});
}

initializeKubeClient();

