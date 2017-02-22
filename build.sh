rm -rf ../.censo-build
ARCH=os.linux.x86_64
meteor build --directory ../.censo-build --architecture=$ARCH
cp Dockerfile ../.censo-build
cp process.yml ../.censo-build
pushd ../.censo-build
docker build -t dwimberger/censo .
popd
