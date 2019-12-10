const database = require('./database');

exports.getItensByType = type => database.execute("Select * from eventeiros.item where type = $1", [type]);
exports.getItens = () => database.execute('Select * from eventeiros.item');
exports.saveItem = item => database.execute('Insert into eventeiros.item(type, description) values ($1, $2) returning *', [item.type, item.description]);
exports.deleteItem = id => database.execute('delete from eventeiros.item where id = $1', [id]);