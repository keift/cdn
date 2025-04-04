## Change DNS

```shell
sudo chattr -i /etc/resolv.conf
sudo rm -rf /etc/resolv.conf
echo -e "nameserver 1.1.1.1\nnameserver 1.0.0.1" | sudo tee /etc/resolv.conf
sudo chattr +i /etc/resolv.conf
sudo systemctl restart NetworkManager
```

## Remove the DNS setting

```shell
sudo chattr -i /etc/resolv.conf
sudo rm -rf /etc/resolv.conf
sudo systemctl restart NetworkManager
```
