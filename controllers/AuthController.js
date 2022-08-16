
import { parse } from 'node-html-parser';
import request from "request";
import fs from "fs";
import cheerio from "cheerio";
import got from "got";
export const AuthController = {
    postDKMH: async (req, res) => {
        try {
            const CurriculumID = req.body.CurriculumID;
            const StudyUnitID = '221' + CurriculumID;
            const Cookie = req.body.Cookie;
            const hdID = req.body.hdID;
            var options = {
                'method': 'POST',
                'url': 'https://dkmh.hcmute.edu.vn/DangKiNgoaiKeHoach/DanhSachLopHocPhanPost?Length=18',
                'headers': {
                    Cookie:'ASP.NET_SessionId='+Cookie,
                    'Content-Type': 'x-www-form-urlencoded'
                },
                form:{
                    StudyUnitID,
                    CurriculumID,
                    hdID,
                    t:Math.random()
                  }
            };
            request(options, function (error, response) {
                if (error) throw new Error(error);
                const $ = cheerio.load(response.body);
                console.log($('p')[0].children[0].data)
                return res.status(200).json({data:$('p')[0].children[0].data})
            });

            

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Hết phiên đăng nhập hoặc sai mã lớp" })
        }
    },
    getHdID: async (req, res) => {
        try {
            const CurriculumID = req.body.CurriculumID;
            const StudyUnitID = '221' + CurriculumID;
            const Cookie = req.body.Cookie;
            const ClassID = req.body.ClassID;
            let hdID = ''
            var options = {
                'method': 'GET',
                'url': `https://dkmh.hcmute.edu.vn/DangKiNgoaiKeHoach/DanhSachLopHocPhan/${StudyUnitID}?CurriculumID=${CurriculumID}&t=${Math.random()}`,
                'headers': {
                    'Cookie': 'ASP.NET_SessionId='+Cookie
                }
            };
            request(options, function (error, response) {
                if (error)
                    return res.status(500).json({ "error": "Lỗi" })
                const $ = cheerio.load(response.body);

                $('.trhover').each((i,element)=>{
                    if (element.children[5].children[0].data == ClassID) {
                        hdID =element.children[1].children[1].attribs.id + '|'
                    }
                })
                if (hdID !== '')
                    return res.status(200).json({ data: hdID });
                return res.status(500).json({ error: "Không tìm thấy lớp học" })

            });

        }
        catch (error) { 
            console.log(error);
            return req.status(500).req({ error: "Lỗi tìm mã lớp" })
        }
    }
}