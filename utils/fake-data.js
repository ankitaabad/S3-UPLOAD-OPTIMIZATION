//@ts-check
const path = require('path');
const ffg = require('fake-file-generator');
const fake_data = async(size_in_mb) => {
  const size = 1024*1024*size_in_mb;
  const filepath =  path.join('/tmp',`fake-data-${Date.now()}.txt`);
  console.log({filepath: filepath});
  await ffg.makeFile(filepath,size,{type:"txt"})
  return filepath 
};

module.exports = {fake_data};





