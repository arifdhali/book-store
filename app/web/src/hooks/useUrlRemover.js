const useUrlRemover = (path) => {
    return path.endsWith("/") ? path.slice(0, -1) : path;

}
export default useUrlRemover
