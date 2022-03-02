import axios from "axios";
import { RequestHandler } from "express";
import {IP_REGISTRY_API_KEY, IP_REGISTRY_DOMAIN, IS_LOCAL, DEFAULT_IP_ADDRESS} from '../../env';
import generateImg from "./generateImg";

interface IPRegistryResponse {
  location: {
    country: {
      name: string;
    },
    city: string;
    language: {
      //ISO code https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
      code: string,
      name: string
    }
  }
}

const getUrl = (ipAddress:string) => `https://${IP_REGISTRY_DOMAIN}/${ipAddress}?key=${IP_REGISTRY_API_KEY}`;

const createMessage = (data: IPRegistryResponse) => {
  const {country, city, language} = data.location;
  return `

Hello stranger, thanks for visiting us from ${city}, ${country.name}.

We hope we can learn more about "${language.code}" for a more special message 😛

  `;
};

const greatings: RequestHandler = async (req, res, next) => {
  const ipAddress = (IS_LOCAL ? DEFAULT_IP_ADDRESS : req.ip) as string;
  const url = getUrl(ipAddress);

  let resData: IPRegistryResponse;
  try {
    const response = await axios.get<IPRegistryResponse>(url);
    resData = response.data;
  } catch (e) {
    return next({code: 'IP_REGISTRY_ERROR', data: e});
  }

  let image: Buffer;

  try {
    const message = createMessage(resData);
    image = await generateImg(message);

  } catch (e) {
    return next({code: 'IMAGE_GENERATION_ERROR', data: e});
  }

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': image.length
  });

  res.end(image); 
};

export default greatings;