module.exports = function (RED) {
    function FindObjectNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        // Evento al recibir un mensaje
        node.on("input", function (msg) {
            // Obtener el array de objetos del mensaje
            var array = msg.payload;

            // Obtener key y keyValue del config o del mensaje
            let key =
                msg.req && msg.req.body && msg.req.body.key !== undefined
                    ? msg.req.body.key
                    : config.key;
            let keyValue =
                msg.req && msg.req.body && msg.req.body.keyValue !== undefined
                    ? msg.req.body.keyValue
                    : config.keyValue;

            // Verificar si array, key y keyValue están definidos
            if (!Array.isArray(array)) {
                node.error("Payload must be an array");
                return;
            }
            if (!key || !keyValue) {
                node.error("Key and keyValue must be defined");
                return;
            }

            // Buscar el objeto que tenga la propiedad con el valor especificado
            var foundObject = array.find((obj) => obj[key] === keyValue);

            // Asignar el objeto encontrado al payload del mensaje
            msg.payload = {
                items: array,
                value: foundObject || null,
            };

            // Enviar el mensaje al siguiente nodo
            node.send(msg);
        });
    }
    RED.nodes.registerType("find-object", FindObjectNode);
};
