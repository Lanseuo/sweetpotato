# Deployment of sweetPotato

## Install dependencies

```
sudo apt-get install -y python python-pip python-virtualenv nginx gunicorn supervisor
```

## Setup virtualenv

```
git clone https://github.com/Lanseuo/sweetPotato
cd sweetPotato
virtualenv venv
. venv/bin/activate
pip install -r requirements.txt
python3 run.py build
```

## Configure nginx

```
sudo /etc/init.d/nginx start
sudo rm /etc/nginx/sites-enabled/default
sudo touch /etc/nginx/sites-available/sweetpotato
sudo ln -s /etc/nginx/sites-available/sweetpotato /etc/nginx/sites-enabled/sweetpotato
```

```
sudo nano /etc/nginx/sites-enabled/sweetpotato
```

```
server {
  location / {
      proxy_pass http://localhost:8456;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
  }
}
```

```
sudo /etc/init.d/nginx restart
```

## Configure supervisor

```
sudo nano /etc/supervisor/conf.d/sweetpotato.conf
```

```
[program:sweetpotato]
command = gunicorn run:app -b localhost:8456
directory = /home/REPLACE-WITH-YOUR-USERNAME/sweetpotato
user = REPLACE-WITH-YOUR-USERNAME
```

```
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start sweetpotato
```
