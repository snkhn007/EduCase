const db = require('../utils/dbUtil');

module.exports = class Schools{
    constructor(name, address, latitude, longitude){
        this.name = name;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    save(){
        return db.execute(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?,?,?,?)',
            [this.name, this.address, this.latitude, this.longitude]
        );
    }

    static fetchAll(){
        return db.execute('SELECT * FROM schools');
    }

    static delete(){
        return db.execute('DELETE FROM schools');
    }
}