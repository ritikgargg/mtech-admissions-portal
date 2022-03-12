let profile_image_url, category_certificate_url;
  const blob = applicantBucket.file(req.files.profile_image[0].originalname);
  const blobStream = blob.createWriteStream();
  
  blobStream.on('error', err => {
    next(err);
  });

  blobStream.on('finish', async () => {
    // The public URL can be used to directly access the file via HTTP.
    profile_image_url = format(
      `https://storage.googleapis.com/${applicantBucket.name}/${blob.name}`
    );
    try {
      await applicantBucket.file(req.files.profile_image[0].originalname).makePublic();
    }
    catch(err) {
      console.log(err)
    }
    console.log(profile_image_url);
    
    if("category_certificate" in req.files){
      const blob2 = applicantBucket.file(req.files.category_certificate[0].originalname);
      const blobStream2 = blob2.createWriteStream();
  
      blobStream2.on('error', err => {
        next(err);
      });
  
      blobStream2.on('finish', async () => {
        // The public URL can be used to directly access the file via HTTP.
        category_certificate_url = format(
          `https://storage.googleapis.com/${applicantBucket.name}/${blob2.name}`
          );
        console.log(category_certificate_url);

        await pool.query("UPDATE applicants SET category_certificate_url = $1 WHERE email_id = $2;", 
                  [category_certificate_url, email]);
      });

      blobStream2.end(req.files.category_certificate[0].buffer);
    }

    await pool.query("UPDATE applicants SET full_name = $1, fathers_name = $2, profile_image_url = $3, \
                  date_of_birth = $4, aadhar_card_number = $5, category = $6, is_pwd = $7, marital_status = $8, \
                  nationality = $9, gender = $10 WHERE email_id = $11;", 
                  [info.full_name, info.fathers_name, profile_image_url, info.date_of_birth, info.aadhar_card_number, 
                  info.category, info.is_pwd, info.marital_status, info.nationality, info.gender, email]);
  });

  blobStream.end(req.files.profile_image[0].buffer);