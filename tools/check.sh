echo 'check lock'
while [ -e $1/deploy.lock ];
do
  echo '!!!! waiting !!!!'
  sleep 5
done
