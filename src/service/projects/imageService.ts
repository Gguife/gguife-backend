import sharp from "sharp";
import fs from "fs";

type imageValidateOptions = {
  maxWidth: number;
  maxHeight: number;
  maxSizeInBytes: number;
}


export const validateImage = async (filePath: string, option: imageValidateOptions): Promise<boolean> => {
  
  const fileStats = fs.statSync(filePath);
  const metadata = await sharp(filePath).metadata();
  
  // Verificar o tipo de arquivo
  const allowedFormat = ['jpeg', 'png'];

  // Verificando tamanho do arquivo
  if(fileStats.size> option.maxSizeInBytes){
    console.log("O tamanho da imagem excede o tamanho permitido!");
    return false;
  }
  
  // Verificando dimensoes
  if(metadata.width && metadata.height){
    if(metadata.width > option.maxWidth || metadata.height > option.maxHeight ){
      console.log("Dimensões de imagem são maiores do que o permitido.");
      return false;
    }
  } else{
    console.log("Não foi possível obter as dimensões da imagem.");
    return false;
  }
  
  return true;
}



// Configurações com AWS S3