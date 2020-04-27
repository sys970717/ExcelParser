'use strict';

const config = require('./config');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const AWS = require('aws-sdk');

AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: config.AWSAccessKeyId,
    secretAccessKey: config.AWSSecretAccessKey
});

const TableName = 'geniet.bmi.standard';

const docClient = new AWS.DynamoDB.DocumentClient();

const file = './datas.xlsx';
const insertModel = {
    "gender": 'm',
    "age": 0,
    "LIGHT": 0,
    "NORMAL": 0,
    "HIGH": 0
}


const parser = function parser() {
    console.log('parser');
    const workbook = XLSX.readFile(file);
    // console.log(workSheet);
    const sheetList = Object.keys(workbook.Sheets);
    
    for(let i = 0; i < sheetList.length; i += 1) {
        let workSheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetList[i]]);
        workSheet.forEach((datas, idx) => {
            insertModel.age = datas['AGE'];
            insertModel.gender = datas['GENDER'];
            insertModel.LIGHT = datas['LIGHT'];
            insertModel.NORMAL = datas['NORMAL'];
            insertModel.HIGH = datas['HIGH'];
            // console.log(`${idx}, ${JSON.stringify(datas)}`);
            docClient.put({
                TableName,
                Item: insertModel,
            }, (err, data) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        });
    }

}


function app() {
    parser();
}

module.exports = app();

// tableName
// geniet.bmi.standard